import { Center, For, HStack, Progress, SimpleGrid } from "@chakra-ui/react";
import CardMenu from "../../../components/ui/card";
import { useEffect, useState } from "react";
import { useMenuCategory } from "../hooks";
import { Chip, SkeletonChip } from "../../../components/ui/chip";

export default function HomeContent() {
  const tempData = [
    {
      imageurl:
        "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/ae6d7be8ee924ba32b6175d12b7cfdac/Derivates/0f2747c199915780ff5efcc9fc98ffbc129d8ca4.jpg",
      name: "Nasi Goreng",
      description: "Indonesian fried rice with egg, chicken, and vegetables.",
      price: 20000, // Assuming price is in IDR
    },
    {
      imageurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa67aJ7-XA59f5YsvWZbAaFORd0khgjk9RTg&s",
      name: "Mie Goreng",
      description: "Traditional stir-fried noodles with soy sauce and meat.",
      price: 18000,
    },
    {
      imageurl:
        "https://img-global.cpcdn.com/recipes/a6ca9f36b02b089b/400x400cq70/photo.jpg",
      name: "Sate Ayam",
      description: "Grilled chicken skewers served with peanut sauce.",
      price: 25000,
    },
    {
      imageurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa67aJ7-XA59f5YsvWZbAaFORd0khgjk9RTg&s",
      name: "Mie Goreng",
      description: "Traditional stir-fried noodles with soy sauce and meat.",
      price: 18000,
    },
    {
      imageurl:
        "https://img-global.cpcdn.com/recipes/a6ca9f36b02b089b/400x400cq70/photo.jpg",
      name: "Sate Ayam",
      description: "Grilled chicken skewers served with peanut sauce.",
      price: 25000,
    },
    {
      imageurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa67aJ7-XA59f5YsvWZbAaFORd0khgjk9RTg&s",
      name: "Mie Goreng",
      description: "Traditional stir-fried noodles with soy sauce and meat.",
      price: 18000,
    },
    {
      imageurl:
        "https://img-global.cpcdn.com/recipes/a6ca9f36b02b089b/400x400cq70/photo.jpg",
      name: "Sate Ayam",
      description: "Grilled chicken skewers served with peanut sauce.",
      price: 25000,
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const { isLoading, data } = useMenuCategory("food");

  return (
    <div>
      <HStack marginTop={"20px"} px={"20px"}>
        {/* Chip Content */}
        {isLoading
          ? [...Array(8)].map((_, idx) => (
              <SkeletonChip key={idx}></SkeletonChip>
            ))
          : null}
        {data
          ? data.data.map((val, idx) => (
              <Chip
                key={val.id}
                onSelect={() => {
                  setSelectedIndex(idx);
                }}
                isSelected={selectedIndex == idx}
                title={val.name}
              ></Chip>
            ))
          : null}
      </HStack>
      {/* Card Content */}
      <SimpleGrid
        gap={"4"}
        columns={{ base: 2, md: 3, lg: 4, xl: 5 }}
        padding={"20px"}
      >
        {tempData.map((val, idx) => (
          <CardMenu
            description={val.description}
            imageurl={val.imageurl}
            name={val.name}
            price={val.price}
          />
        ))}
      </SimpleGrid>
    </div>
  );
}
