<?php
    require_once './connect.php';
    $type = $_GET['type'];
    switch ($type) {
        case 'get':
            $amount = $_GET['amount'];
            if($amount == 'part')
            {
                $items = $_GET['items'];
                $object_arr = join("','",$items);   
                $sql = "SELECT * FROM object WHERE id IN ('$object_arr')";
                $result = mysqli_query($con, $sql);
                if (!$result) {
                    printf("Error: %s\n", mysqli_error($con));
                    exit();
                }
                $data = [];
                while($row = mysqli_fetch_array($result))
                {
                    array_push($data,$row);
                }
                echo json_encode($data, JSON_UNESCAPED_UNICODE);
            }
            break;
        case 'delete':

            // $items = $_GET['items'];
            // $object_arr = join(",",$items);
            // echo $object_arr;
            // $sql = "DELETE FROM data WHERE id IN (".$object_arr.")";
            break;
        default:
            # code...
            break;
    }