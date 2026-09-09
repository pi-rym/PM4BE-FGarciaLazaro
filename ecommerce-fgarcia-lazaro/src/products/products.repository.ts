import { Injectable } from "@nestjs/common";
import { Products } from "./products.interfaces";

const products : Products[] = [
  {
    id: "prod-001",
    name: "Auriculares Inalámbricos Noise Cancelling",
    description: "Auriculares over-ear con cancelación de ruido activa y hasta 30 horas de batería.",
    price: 199.99,
    stock: 15,
    imgUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
  },
  {
    id: "prod-002",
    name: "Teclado Mecánico RGB",
    description: "Teclado mecánico retroiluminado con switches red silenciosos e iluminación personalizable.",
    price: 89.50,
    stock: 8,
    imgUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500"
  },
  {
    id: "prod-003",
    name: "Mouse Gamer Ergonómico",
    description: "Mouse con sensor óptico de 16,000 DPI y 6 botones programables.",
    price: 45.00,
    stock: 0,
    imgUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500"
  },
  {
    id: "prod-004",
    name: "Monitor 4K UHD 27\"",
    description: "Monitor con panel IPS, resolución 3840x2160 y tecnología HDR400.",
    price: 349.99,
    stock: 5,
    imgUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500"
  },
  {
    id: "prod-005",
    name: "Smartwatch Deportivo",
    description: "Reloj inteligente con monitor de ritmo cardíaco, GPS integrado y resistencia al agua.",
    price: 129.90,
    stock: 20,
    imgUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
  },
  {
    id: "prod-006",
    name: "Silla Gamer Ergonómica",
    description: "Silla de oficina y gaming con soporte lumbar ajustable y reposabrazos 3D.",
    price: 210.00,
    stock: 0,
    imgUrl: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500"
  },
  {
    id: "prod-007",
    name: "Cámara Mirrorless 4K",
    description: "Cámara fotográfica de objetivos intercambiables con grabación de video en 4K.",
    price: 799.00,
    stock: 4,
    imgUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500"
  },
  {
    id: "prod-008",
    name: "Micrófono Condensador USB",
    description: "Micrófono ideal para streaming y podcasts con patrón polar cardioide.",
    price: 69.99,
    stock: 12,
    imgUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500"
  },
  {
    id: "prod-009",
    name: "Disco Duro Externo 2TB",
    description: "Unidad de almacenamiento portátil con conexión USB 3.0 ultra rápida.",
    price: 75.25,
    stock: 25,
    imgUrl: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=500"
  },
  {
    id: "prod-010",
    name: "Lámpara de Escritorio LED",
    description: "Lámpara moderna con regulador de brillo, control táctil y puerto de carga USB.",
    price: 32.00,
    stock: 0,
    imgUrl: "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=500"
  },
  {
    id: "prod-011",
    name: "Hub USB-C 7 en 1",
    description: "Adaptador multipuerto con salidas HDMI 4K, lectores de tarjeta SD y puertos USB 3.0.",
    price: 39.99,
    stock: 30,
    imgUrl: "https://images.unsplash.com/photo-1616440342981-d10a24177699?w=500"
  },
  {
    id: "prod-012",
    name: "Mochila para Laptop de 15.6\"",
    description: "Mochila con compartimento acolchado, material impermeable y conector externo USB.",
    price: 49.90,
    stock: 18,
    imgUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
  }
];



@Injectable()
export class ProductsRepository {




getAllProducts() : Products[]{
    return products;
}

getProductById(id: string) {
    
}

addNewProduct(product: any) {
    
}
updateProduct(id: string, editProduct: any) {
    
}
deleteProduct(id: string) {
    
}
}