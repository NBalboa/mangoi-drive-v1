<?php

namespace App\Enums;

enum UserRole: int
{
    case ADMIN = 0;
    case CUSTOMER = 1;


    public static function getStringValue(int $code): string
    {
        switch ($code) {
            case self::ADMIN->value:
                return "ADMIN";
            case self::CUSTOMER->value:
                return "CUSTOMER";
            default:
                return "OPPSS";
        }
    }


}
