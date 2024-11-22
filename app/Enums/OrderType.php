<?php

namespace App\Enums;

enum OrderType: int
{
    case DINE_IN = 0;
    case TAKE_OUT = 1;
    case DELIVERY = 2;
}
