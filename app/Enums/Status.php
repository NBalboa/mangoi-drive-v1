<?php

namespace App\Enums;

enum Status: int
{
    case PENDING = 0;
    case CONFIRMED = 1;
    case TO_DELIEVER = 2;
    case DELIVERED = 4;
    case CANCELLED = 5;
}
