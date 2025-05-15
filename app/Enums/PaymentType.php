<?php

namespace App\Enums;

enum PaymentType: int
{
    case CASH  = 0;
    case PAYPAL = 1;
    case GCASH = 2;
}
