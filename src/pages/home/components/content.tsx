import { HStack, SimpleGrid, useMenu } from "@chakra-ui/react";
import CardMenu from "../../../components/ui/card";
import { useEffect, useState } from "react";
import { useMenus } from "../hooks";
import {
  Chip,
  SkeletonCardMenu,
  SkeletonChip,
} from "../../../components/ui/chip";
import { useMenuStore } from "../../../hooks/menu-store";
import { CategoryType } from "../../../services/menu-category";

export default function HomeContent() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedCategoryID, setSelectedCategoryID] = useState<
    number | undefined
  >(undefined);

  const { cateData, menuData, isMenuLoading, isCateLoading } =
    useMenus(selectedCategoryID);

  const menuStore = useMenuStore();

  useEffect(() => {
    setSelectedCategoryID(undefined);
    setSelectedIndex(0);
  }, [menuStore.selectedType[0]]);

  return (
    <div>
      <HStack marginTop={"20px"} px={"20px"}>
        {/* Chip Content */}
        {isCateLoading
          ? [...Array(8)].map((_, idx) => <SkeletonChip key={idx} />)
          : cateData?.data?.map((val, idx) => (
              <Chip
                key={val.id}
                onSelect={() => {
                  setSelectedIndex(idx);
                  setSelectedCategoryID(val.id);
                }}
                isSelected={selectedIndex === idx}
                title={val.name}
              />
            ))}
      </HStack>
      {/* Card Content */}
      <SimpleGrid
        gap={"4"}
        columns={{ base: 2, md: 3, lg: 4, xl: 5 }}
        padding={"20px"}
      >
        {isMenuLoading
          ? [...Array(8)].map((_, idx) => (
              <SkeletonCardMenu key={idx}></SkeletonCardMenu>
            ))
          : null}
        {menuData && menuData.data
          ? menuData.data.map((val) => (
              <CardMenu
                description={val.description}
                imageurl={val.image_url}
                name={val.name}
                price={val.price}
                key={val.id}
              />
            ))
          : null}
      </SimpleGrid>
    </div>
  );
}
