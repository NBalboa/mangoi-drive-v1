<?php

namespace App\Enums;

enum PaymentType: int
{
    case CASH  = 0;
    case PAYPAL = 1;
}
