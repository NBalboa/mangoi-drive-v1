<?php

namespace App\Enums;

enum UserRole: int
{
    case ADMIN = 0;
    case CUSTOMER = 1;
}
