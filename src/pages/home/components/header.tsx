import {
  Box,
  Button,
  createListCollection,
  HStack,
  Image,
  Input,
  NativeSelect,
  Portal,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { TransactionOrder } from "@icon-park/react";

export default function Header() {
  const typeMenu = createListCollection({
    items: [
      {
        label: "Food",
        value: "food",
      },
      {
        label: "Beverage",
        value: "Beverage",
      },
    ],
  });

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
      <Input
        className="text-poppins"
        width={"40%"}
        placeholder="Search"
        background="white"
        height={"10"}
        color={"black"}
      ></Input>
    </VStack>
  );
}
