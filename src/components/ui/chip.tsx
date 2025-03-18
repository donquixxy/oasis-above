import { Box, Card, Skeleton, SkeletonText, Text } from "@chakra-ui/react";

interface IProps {
  title: string;
  isSelected: boolean;
  onSelect?: () => void;
}

function Chip(props: IProps) {
  return (
    <Box
      as="button"
      bg={props.isSelected ? "#9F8E68" : "#323233"}
      borderRadius="full"
      px="16px"
      py="8px"
      m="4px"
      cursor="pointer"
      _hover={{ opacity: 0.8 }}
      transition="background 0.3s"
      onClick={props.onSelect}
    >
      <Text
        color={props.isSelected ? "white" : "#7f7e7f"}
        fontWeight="medium"
        fontFamily="Poppins"
      >
        {props.title}
      </Text>
    </Box>
  );
}

function SkeletonChip() {
  return (
    <Skeleton
      borderRadius="full"
      px="16px"
      py="8px"
      m="4px"
      height="32px"
      width="80px"
    />
  );
}

function SkeletonCardMenu() {
  return (
    <Card.Root
      maxW={{ base: "300px", md: "md", lg: "lg", xl: "auto" }}
      flexDirection="column"
      overflow="hidden"
      className="text-poppins"
    >
      <Skeleton height={{ base: "280px", md: "350px", lg: "400px" }} />

      <Card.Body
        padding={"20px"}
        flex="1"
        display="flex"
        flexDirection="column"
      >
        <Skeleton height="20px" width="70%" mb="10px" />
        <Box flex="1" overflow="hidden">
          <SkeletonText mt="4" noOfLines={3} />
        </Box>
        <br />
        <Skeleton height="20px" width="40%" />
      </Card.Body>

      <Card.Footer display="flex" justifyContent="center" mt="auto">
        <Skeleton height="40px" width="80%" borderRadius="14px" />
      </Card.Footer>
    </Card.Root>
  );
}

export { Chip, SkeletonChip, SkeletonCardMenu };
