<?php
    require_once './connect.php';
    $type = $_GET['type'];
    switch ($type) {
        case 'get':
            $amount = $_GET['amount'];
            if($amount == 'all')
            {
                $sql = "SELECT * FROM data where 1";
                $result = mysqli_query($con, $sql);
                $data = [];
                while($row = mysqli_fetch_array($result))
                {
                    array_push($data,$row);
                }
                echo json_encode($data, JSON_UNESCAPED_UNICODE);
            }
            else if($amount == 'part')
            {
                $items = $_GET['items'];
                $audio_arr = join("','",$items);
                $sql = "SELECT * FROM data where id IN ('$audio_arr')";
                $result = mysqli_query($con, $sql);
                $data = [];
                while($row = mysqli_fetch_array($result))
                {
                    array_push($data,$row);
                }
                echo json_encode($data, JSON_UNESCAPED_UNICODE);
            }
            break;
        
        default:
            # code...
            break;
    }