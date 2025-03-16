import { Button, Card, Image, Text, Box } from "@chakra-ui/react";

interface ICardProps {
  imageurl: string;
  name: string;
  description: string;
  price: number;
}

export default function CardMenu(props: ICardProps) {
  return (
    <Card.Root
      maxW={{ base: "300px", md: "md", lg: "lg", xl: "auto" }}
      flexDirection="column"
      className="text-poppins"
      overflow="hidden"
    >
      <Image
        height={{ base: "300px", md: "350", lg: "400px" }}
        src={props.imageurl}
        alt={props.name}
      />
      <Card.Body
        padding={"20px"}
        flex="1"
        display="flex"
        flexDirection="column"
      >
        <Card.Title>{props.name}</Card.Title>
        <Box flex="1" overflow="hidden">
          <Card.Description>{props.description}</Card.Description>
        </Box>
        <br></br>
        <Text>{props.price}</Text>
      </Card.Body>

      <Card.Footer display="flex" justifyContent="center" mt="auto">
        <Button
          borderColor={"#9F8E68"}
          variant={"outline"}
          width="80%"
          color={"#9F8E68"}
          borderRadius={"14px"}
        >
          Add To Cart
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}
