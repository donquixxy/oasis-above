import { HStack, SimpleGrid } from "@chakra-ui/react";
import CardMenu from "../../../components/ui/card";
import { useEffect, useState } from "react";
import { useMenus } from "../hooks";
import {
  Chip,
  SkeletonCardMenu,
  SkeletonChip,
} from "../../../components/ui/chip";
import { useFormStore, useMenuStore } from "../../../hooks/menu-store";

export default function HomeContent() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedCategoryID, setSelectedCategoryID] = useState<
    number | undefined
  >(undefined);

  const { cateData, menuData, isMenuLoading, isCateLoading } =
    useMenus(selectedCategoryID);

  const menuStore = useMenuStore();
  const useForm = useFormStore();

  useEffect(() => {
    setSelectedCategoryID(undefined);
    setSelectedIndex(0);
    useForm.resetValue();
  }, [menuStore.selectedType[0]]);

  useEffect(() => {}, [useForm.value]);

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
                id={val.id}
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
