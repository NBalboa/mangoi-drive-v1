import {
    getAllProvinces,
    getBarangaysByMunicipality,
    getMunicipalitiesByProvince,
} from "@aivangogh/ph-address";
import { useState } from "react";

function useAdrress() {
    const [cities, setCities] = useState([]);
    const [barangays, setBarangays] = useState([]);
    const provinces = getAllProvinces();

    function getCitiesByProvince(code) {
        const province = provinces.find((province) => {
            if (province.psgcCode === code) {
                return province;
            }
        });
        const cities = getMunicipalitiesByProvince(province.psgcCode);
        if (province && cities) {
            setCities(cities);
        }
    }

    function getBarangayByCities(code) {
        const city = cities.find((city) => {
            if (city.psgcCode === code) {
                return city;
            }
        });

        const barangays = getBarangaysByMunicipality(city.psgcCode);

        if (barangays && city) {
            setBarangays(barangays);
        }
    }

    function getProvinceName(code) {
        const province = provinces.find((province) => {
            if (province.psgcCode === code) {
                return province;
            }
        });

        return province.name;
    }

    function getCityName(code) {
        const city = cities.find((city) => {
            if (city.psgcCode === code) {
                return city;
            }
        });

        return city.name;
    }

    function getBarangayName(code) {
        const barangay = barangays.find((barangay) => {
            if (barangay.psgcCode === code) {
                return barangay;
            }
        });

        return barangay.name;
    }

    return {
        provinces: provinces,
        cities: cities,
        barangays: barangays,
        getCitiesByProvince: getCitiesByProvince,
        getBarangayByCities: getBarangayByCities,
        getProvinceName: getProvinceName,
        getCityName: getCityName,
        getBarangayName: getBarangayName,
    };
}

export default useAdrress;
