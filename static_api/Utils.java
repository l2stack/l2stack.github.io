import java.io.*;
import java.net.*;


public class Utils {


    public static void TestServer() {
        try {
            ServerSocket serverSocket = new ServerSocket(5000);
            System.out.println("Server is running...");
            Socket socket = serverSocket.accept();
            System.out.println("Client connected.");
            BufferedReader input = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            PrintWriter output = new PrintWriter(socket.getOutputStream(), true);
            String receivedMessage;
            while ((receivedMessage = input.readLine()) != null) {
                System.out.println("Client: " + receivedMessage);
                output.println("Server received: " + receivedMessage);
            }
            socket.close();
            serverSocket.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static String TinhDienTichTamGiac(float a, float b, float c) {
        if (a + b > c && a + c > b && b + c > a) {
            float p = (a + b + c) / 2;
            float area = (float) Math.sqrt(p * (p - a) * (p - b) * (p - c));
            return "Diện tích tam giác là " + area + " m2";
        } else {
            return "Không phải tam giác";
        }
    }


    public static void TestClient() {
        try {
            Socket socket = new Socket("localhost", 5000);
            BufferedReader input = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            PrintWriter output = new PrintWriter(socket.getOutputStream(), true);
            BufferedReader userInput = new BufferedReader(new InputStreamReader(System.in));
            String message;
            while (true) {
                System.out.print("Enter message to server: ");
                message = userInput.readLine();
                output.println(message);
                String receivedMessage = input.readLine();
                System.out.println("Server: " + receivedMessage);
                if (message.equalsIgnoreCase("exit")) {
                    break;
                }
            }
            socket.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }



    /***
     * Split string
     * @param s Input string
     * @return String arr [index] => 0: Uppercase 1: Lowercase 2: Numberic
     */
    public static String[] SplitString(String s) {
        StringBuilder upper = new StringBuilder();
        StringBuilder lower = new StringBuilder();
        StringBuilder number = new StringBuilder();
        for (char c : s.toCharArray()) {
            if (Character.isUpperCase(c)) {
                upper.append(c);
            } 
            if (Character.isLowerCase(c)) {
                lower.append(c);
            }
            if (Character.isDigit(c)) {
                number.append(c);
            }
        }
        String[] ss = new String[3];
        ss[0] = upper.toString();
        ss[1] = lower.toString();
        ss[2] = number.toString();
        return ss;
    }
}
