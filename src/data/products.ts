export type Product = {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    imgSource: string;
};

export const products: Product[] = [
    {
        id: 1,
        title: "Xbox Series S",
        description: "Velocidad y rendimiento de última generación a un precio excelente.",
        category: "Consolas",
        price: 299990,
        imgSource: "/img/seriesS.png"
    },
    {
        id: 2,
        title: "Xbox Series X",
        description: "Consola más potente de Microsoft con 1TB de almacenamiento.",
        category: "Consolas",
        price: 629990,
        imgSource: "/img/seriesX.png"
    },
    {
        id: 3,
        title: "PC Gamer RGB",
        description: "Ryzen 7, RTX 4070, 32GB RAM. Ideal para gaming extremo.",
        category: "Computadores",
        price: 1199990,
        imgSource: "/img/pcnoBG.png"
    },
    {
        id: 4,
        title: "Teclado Mecánico RGB",
        description: "Switches rojos ultra rápidos, ideal para eSports.",
        category: "Periféricos",
        price: 89990,
        imgSource: "/img/tecladonoBG.png"
    },
    {
        id: 5,
        title: "PlayStation 5",
        description: "Consola de nueva generación con gráficos 4K y mando DualSense.",
        category: "Consolas",
        price: 649990,
        imgSource: "/img/ps5noBG.png"
    },
    {
        id: 6,
        title: "Mouse Gamer Logitech G Pro",
        description: "Sensor HERO 25K, diseño ligero y preciso.",
        category: "Periféricos",
        price: 69990,
        imgSource: "/img/mouseG.png"
    },
    {
        id: 7,
        title: "Auriculares HyperX Cloud II",
        description: "Sonido envolvente 7.1 y micrófono desmontable.",
        category: "Periféricos",
        price: 79990,
        imgSource: "/img/audifonos.png"
    }
];