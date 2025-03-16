import { Box, Skeleton, Text } from "@chakra-ui/react";

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

export { Chip, SkeletonChip };
