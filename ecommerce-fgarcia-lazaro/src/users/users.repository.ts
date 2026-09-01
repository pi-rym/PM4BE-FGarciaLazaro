import { Injectable } from "@nestjs/common";

const users: Users[] = [
  {
    id: "usr-101",
    email: "carlos.mendoza@email.com",
    name: "Carlos Mendoza",
    password: "Password123!",
    address: "Av. Corrientes 1234",
    phone: "+54 11 4567-8901",
    country: "Argentina",
    city: "Buenos Aires"
  },
  {
    id: "usr-102",
    email: "ana.garcia@email.com",
    name: "Ana García",
    password: "SecurePass456#",
    address: "Calle Mayor 45, 2B",
    phone: "+34 612 345 678",
    country: "España",
    city: "Madrid"
  },
  {
    id: "usr-103",
    email: "john.doe@email.com",
    name: "John Doe",
    password: "MySecretPass789$",
    address: "742 Evergreen Terrace",
    phone: "+1 555-0199",
    country: "Estados Unidos",
    city: "Springfield"
  },
  {
    id: "usr-104",
    email: "mariana.silva@email.com",
    name: "Mariana Silva",
    password: "P@ssword2024",
    address: "Rua Augusta 500",
    phone: "+55 11 98765-4321",
    country: "Brasil",
    city: "São Paulo"
  },
  {
    id: "usr-105",
    email: "luis.hernandez@email.com",
    name: "Luis Hernández",
    password: "ClaveSegura321!",
    address: "Av. Reforma 222",
    phone: "+52 55 1234 5678"
    // Sin country ni city (propiedades opcionales)
  },
  {
    id: "usr-106",
    email: "camila.torres@email.com",
    name: "Camila Torres",
    password: "UserPass55!",
    address: "Av. Providencia 1010",
    phone: "+56 9 8765 4321",
    city: "Santiago"
    // Sin country
  },
  {
    id: "usr-107",
    email: "sofia.lopez@email.com",
    name: "Sofía López",
    password: "S0fiaPass99*",
    address: "Calle 50 #12-34",
    phone: "+57 601 2345678",
    country: "Colombia",
    city: "Bogotá"
  },
  {
    id: "usr-108",
    email: "david.smith@email.com",
    name: "David Smith",
    password: "DavidSafePass!1",
    address: "10 Downing Street",
    phone: "+44 20 7946 0912",
    country: "Reino Unido"
    // Sin city
  },
  {
    id: "usr-109",
    email: "lucia.martinez@email.com",
    name: "Lucía Martínez",
    password: "LuMart2024#",
    address: "Av. Javier Prado 450",
    phone: "+51 1 234 5678",
    country: "Perú",
    city: "Lima"
  },
  {
    id: "usr-110",
    email: "mateo.rodriguez@email.com",
    name: "Mateo Rodríguez",
    password: "MatPass88!",
    address: "Calle 18 de Julio 1420",
    phone: "+598 99 123 456",
    country: "Uruguay",
    city: "Montevideo"
  },
  {
    id: "usr-111",
    email: "valentina.gomez@email.com",
    name: "Valentina Gómez",
    password: "ValGomez#4321",
    address: "Av. Vallarta 3200",
    phone: "+52 33 9876 5432",
    country: "México",
    city: "Guadalajara"
  },
  {
    id: "usr-112",
    email: "gabriel.fischer@email.com",
    name: "Gabriel Fischer",
    password: "GabiPass999!",
    address: "Berliner Str. 12",
    phone: "+49 30 1234567",
    country: "Alemania",
    city: "Berlín"
  }
];

export interface Users {
id: string;
  email: string;
  name: string;
  password: string;
  address: string;
  phone: string;
  country?: string;
  city?: string;
}

@Injectable()
export class UserRepository {
getAllUsers(){
        return users;
    }
}