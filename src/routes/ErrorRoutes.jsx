const ErrorRoutes = {
    path: "*",
    element: (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                background: "linear-gradient(135deg, #ff9a9e, #fad0c4, #fad0c4)",
                fontFamily: "Poppins, sans-serif",
            }}
        >
            <h1
                style={{
                    fontSize: "4rem",
                    fontWeight: "800",
                    color: "#ffffff",
                    textShadow: "3px 3px 8px rgba(0,0,0,0.2)",
                    marginBottom: "10px",
                }}
            >
                🚧 DESIGN IN PROGRESS 🚧
            </h1>

            <p
                style={{
                    fontSize: "1.4rem",
                    color: "#fff",
                    opacity: 0.9,
                }}
            >
                This page is under construction.
            </p>
        </div>
    ),
};

export default ErrorRoutes;
