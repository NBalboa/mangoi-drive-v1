<?php

namespace App\Enums;

enum Status: int
{
    case PENDING = 0;
    case CONFIRMED = 1;
    case READY = 2;
    case TO_DELIVER = 3;
    case DELIVERED = 4;
    case CANCELLED = 5;

}
