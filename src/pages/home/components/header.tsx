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
import { TransactionOrder } from "@icon-park/react";
import { useMenuStore } from "../../../hooks/menu-store";

export default function Header() {
  const typeMenu = createListCollection({
    items: [
      {
        label: "Food",
        value: "food",
      },
      {
        label: "Beverage",
        value: "beverage",
      },
      {
        label: "Tobacco",
        value: "tobacco",
      },
    ],
  });

  const useMenu = useMenuStore();

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

        <Box position="absolute" right="0">
          <TransactionOrder
            className="icon"
            theme="outline"
            size="24"
            fill="#9F8E68"
            onClick={() => alert("clicked")}
          />
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
        ></Input>
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
