import {
  Box,
  createListCollection,
  HStack,
  Image,
  Input,
  Portal,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ShoppingCart } from "@icon-park/react";
import { useFormStore, useMenuStore } from "../../../hooks/menu-store";
import { useCart } from "../hooks";
import { useEffect, useState } from "react";
import { CartDrawer } from "./drawer";

export default function Header() {
  const typeMenu = createListCollection({
    items: [
      { label: "Food", value: "food" },
      { label: "Beverage", value: "beverage" },
      { label: "Tobacco", value: "tobacco" },
    ],
  });

  const [cartCount, setCartCount] = useState(0);
  const useMenu = useMenuStore();
  const { data, isError } = useCart();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const useForm = useFormStore();

  useEffect(() => {
    if (data?.data && data?.data.items) {
      setCartCount(data?.data.items.length);
    } else {
      setCartCount(0);
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      setCartCount(0);
    }
  }, [isError]);

  return (
    <VStack className="header-container" width="full" p={4} position="relative">
      <HStack
        width="full"
        maxW="1200px"
        px={4}
        justifyContent="center"
        position="relative"
      >
        <Box>
          <Image src="./oa-logo-web.png" />
        </Box>

        {/* Cart Component */}
        <Box position="absolute" right="0">
          <Box position="relative" display="inline-block">
            <ShoppingCart
              className="icon"
              theme="outline"
              size="30"
              fill="#9F8E68"
              onClick={() => {
                setIsOpenDrawer(true);
              }}
            />

            <CartDrawer
              onClose={() => {
                setIsOpenDrawer(false);
              }}
              Data={isError ? undefined : data?.data}
              isOpen={isOpenDrawer}
            ></CartDrawer>
            {/* Badge */}
            {cartCount > 0 && (
              <Box
                position="absolute"
                top="-1"
                right="-1"
                background="red.500"
                color="white"
                width="18px"
                height="18px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="full"
                fontSize="xs"
                fontWeight="bold"
              >
                {cartCount}
              </Box>
            )}
          </Box>
        </Box>
      </HStack>

      <Text
        marginTop={"20"}
        className="text-montserrat"
        fontSize="22px"
        color="white"
      >
        OUR MENU
      </Text>

      <HStack justifyContent={"center"} width={"60%"} alignContent={"center"}>
        <Input
          className="text-poppins"
          width={"40%"}
          placeholder="Search"
          background="white"
          height={"10"}
          color={"black"}
          onChange={(val) => {
            val.preventDefault();
            useForm.setValue(val.target.value);
          }}
          value={useForm.value}
        />
        <Select.Root
          width={{ base: "100px", md: "140px", lg: "160px" }}
          collection={typeMenu}
          defaultValue={useMenu.selectedType}
          onValueChange={(val) => {
            useMenu.setSelectedType(val.value);
          }}
        >
          <Select.HiddenSelect />
          <Select.Control>
            <Select.Trigger
              background="white"
              height={"10"}
              borderRadius="md"
              border="1px solid #ccc"
              color="black"
              paddingX={4}
            >
              <Select.ValueText placeholder="Type" defaultValue={"Food"} />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {typeMenu.items.map((framework) => (
                  <Select.Item item={framework} key={framework.value}>
                    {framework.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
      </HStack>
    </VStack>
  );
}
