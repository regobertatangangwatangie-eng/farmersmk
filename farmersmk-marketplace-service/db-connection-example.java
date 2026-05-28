// Example PostgreSQL connection in Java using JDBC
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DbConnectionExample {
    public static void main(String[] args) {
        String url = "jdbc:postgresql://db:5432/farmersmkdb";
        String user = "farmersmk";
        String password = "farmersmkpass";

        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            if (conn != null) {
                System.out.println("Connected to the database!");
            } else {
                System.out.println("Failed to make connection!");
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }
}
