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


    public static function getStringValue(int $code): string
    {

        switch ($code) {
            case self::PENDING->value:
                return "PENDING";
            case self::CONFIRMED->value:
                return "CONFIRMED";
            case self::READY->value:
                return "READY";
            case self::TO_DELIVER->value:
                return "TO DELIVER";
            case self::DELIVERED->value:
                return "DELIVERED";
            case self::CANCELLED->value:
                return "CANCEL";
            default:
                return "OPPSS";
        }
    }
}
