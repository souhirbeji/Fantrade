import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Grid } from "@mui/material";
import StatCard from "../StatCard/StatCard";
import BarChartVertical from "../BarChartVertical/BarChartVertical";
import DoughnutChart from "../DoughnutChart/DoughnutChart";
import { Inventory, AttachMoney, Category, Star } from "@mui/icons-material";
import DataTable from "../DataTable/DataTable";
import { getUserByToken, getProductsBySellerId } from "../../api/api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserByToken();
        console.log("userData", userData);
        setUser(userData);
        const productsData = await getProductsBySellerId(userData.id);
        console.log("productsData", productsData);
        if (!productsData.error) {
          setProducts(productsData);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  // Statistiques calculées à partir des produits
  const totalProducts = products.length;
  const totalRevenue = products
    .reduce((sum, product) => sum + product.price, 0)
    .toFixed(2);
  const uniqueCategories = [
    ...new Set(products.map((product) => product.category)),
  ].length;

  // Calcul de la moyenne totale des ratings
  const totalRatings = products.reduce(
    (sum, product) => sum + product.ratings.length,
    0
  );
  const averageRating =
    totalRatings > 0
      ? (
          products.reduce(
            (sum, product) =>
              sum +
              product.ratings.reduce(
                (ratingSum, rating) => ratingSum + rating.rating,
                0
              ),
            0
          ) / totalRatings
        ).toFixed(2)
      : "N/A";

  // Données pour les StatCards
  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: <Inventory />,
      color: "orange",
    },
    {
      title: "Total Revenue",
      value: `${totalRevenue} €`,
      icon: <AttachMoney />,
      color: "green",
    },
    {
      title: "Unique Categories",
      value: uniqueCategories,
      icon: <Category />,
      color: "blue",
    },
    {
      title: "Average Rating",
      value: averageRating,
      icon: <Star />,
      color: "purple",
    },
  ];

  // Calcul des produits par mois
  const productsByMonth = products.reduce((acc, product) => {
    const month = new Date(product.createdAt).toLocaleString("default", {
      month: "short",
    });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const barChartVerticalData = {
    labels: Object.keys(productsByMonth), // Mois
    datasets: [
      {
        label: "Products Created",
        data: Object.values(productsByMonth), // Nombre de produits par mois
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  // Produits par catégorie pour Doughnut Chart
  const productsByCategory = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  const doughnutChartData = {
    labels: Object.keys(productsByCategory), // Catégories
    datasets: [
      {
        data: Object.values(productsByCategory), // Nombre de produits par catégorie
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box sx={{ padding: 4 }}>
      {/* Statistiques */}
      <Grid container spacing={4}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
            />
          </Grid>
        ))}
      </Grid>

      {/* Graphiques */}
      <Grid container spacing={4} sx={{ marginTop: 4 }}>
        <Grid item xs={12} md={8}>
          <DataTable initialProducts={products} user={user} />
        </Grid>

        <Grid item xs={12} md={4}>
          <DoughnutChart
            data={doughnutChartData}
            options={{
              responsive: true,
              plugins: { legend: { position: "right" } },
            }}
          />
        </Grid>
      </Grid>

      <Box sx={{ marginTop: 4 }}>
        <BarChartVertical
          data={barChartVerticalData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "top" },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Months",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Number of Products",
                },
                beginAtZero: true,
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
