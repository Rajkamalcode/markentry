<?php
// Database connection
$servername = "localhost";
$username = "root"; // Your MySQL username
$password = ""; // Your MySQL password
$dbname = "marks"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    echo "Connected successfully"; // Log connection success
}

// Handle form submission
// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Process form data
    $registerNumber = $_POST['registerNumber'];
    $name = $_POST['name'];
    $selectedCT = $_POST['selectedCT']; // Retrieve selected CT value
    
    // Insert or update student info
    $sql = "INSERT INTO students (register_number, name) VALUES ('$registerNumber', '$name') ON DUPLICATE KEY UPDATE name = '$name'";

    if ($conn->query($sql) !== TRUE) {
        echo "Error: " . $sql . "<br>" . $conn->error;
    } else {
        echo "Student info saved successfully"; // Log student info save success
    }

    // Insert or update marks
// Insert or update marks
// Insert or update marks
// Insert or update marks
// Insert or update marks
foreach ($_POST['marks'] as $subjectCode => $marks) {
    $ct = $marks['ct'];

    $sql = "INSERT INTO marks (register_number, subject_code, $selectedCT)
            VALUES ('$registerNumber', '$subjectCode', $ct);
    if ($conn->query($sql) !== TRUE) {
        echo "Error: " . $sql . "<br>" . $conn->error;
    } else {
        echo "Marks saved successfully"; // Log marks save success
    }
}


}


// Fetch and display marks
$sql = "SELECT students.register_number, students.name, marks.subject_code, marks.ct1, marks.ct1pr, marks.ct2, marks.ct2pr, marks.ct3, marks.ct3pr
        FROM students
        LEFT JOIN marks ON students.register_number = marks.register_number";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "<table><tr><th>Register Number</th><th>Name</th><th>Subject Code</th><th>CT1</th><th>CT1 Practical</th><th>CT2</th><th>CT2 Practical</th><th>CT3</th><th>CT3 Practical</th></tr>";
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "<tr><td>".$row["register_number"]."</td><td>".$row["name"]."</td><td>".$row["subject_code"]."</td><td>".$row["ct1"]."</td><td>".$row["ct1pr"]."</td><td>".$row["ct2"]."</td><td>".$row["ct2pr"]."</td><td>".$row["ct3"]."</td><td>".$row["ct3pr"]."</td></tr>";
    }
    echo "</table>";
} else {
    echo "0 results";
}

$conn->close();
?>
