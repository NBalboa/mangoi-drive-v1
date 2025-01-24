<?php

namespace App\Enums;

enum Status: int
{
    case PENDING = 0;
    case CANCELLED = 1;
    case CONFIRMED = 2;
    case READY = 3;
    case TO_DELIVER = 4;
    case DELIVERED = 5;

}
