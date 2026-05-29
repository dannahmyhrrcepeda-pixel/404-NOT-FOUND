<?php
include '../config/database.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $user_id = $_POST['user_id'];
    $date = $_POST['appointment_date'];
    $time = $_POST['appointment_time'];
    $service = $_POST['service_type'];

    $sql = "INSERT INTO appointments
            (user_id, appointment_date, appointment_time, service_type)
            VALUES
            ('$user_id', '$date', '$time', '$service')";

    if ($conn->query($sql)) {
        echo "Appointment Submitted Successfully!";
    } else {
        echo "Error: " . $conn->error;
    }
}
?>

<form method="POST">

    <input type="text" name="user_id" placeholder="User ID" required><br><br>

    <input type="date" name="appointment_date" required><br><br>

    <input type="time" name="appointment_time" required><br><br>

    <select name="service_type" required>
        <option value="">Select Service</option>
        <option value="Barangay Clearance">Barangay Clearance</option>
        <option value="Certificate of Residency">Certificate of Residency</option>
        <option value="Business Permit">Business Permit</option>
    </select><br><br>

    <button type="submit">Book Appointment</button>
</form>