import { Text, Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { Image } from "@chakra-ui/react";
import { ButtonGroup } from "@chakra-ui/react";
import { ArrowBackIcon, EmailIcon, WarningIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/react";
import {
  Box,
  chakra,
  Container,
  Stack,
  VStack,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
  Button,
} from "@chakra-ui/react";
const BlogPage: NextPage<{
  slug: string;
  keywords: string;
  fechaDePublicacion: string;
  titular: string;
  imagen: string;
  detalle: string;
}> = (props) => {
  const router = useRouter();

  //const test = JSON.parse(router.query.data as string) ;
  const { slug } = router.query;

  return (
    <Container maxW={"7xl"}>
      <Stack direction="row" spacing={4} marginTop="15">
        <Link href="/about">
          <Button
            leftIcon={<ArrowBackIcon />}
            colorScheme="teal"
            variant="outline"
          >
            Go back
          </Button>
        </Link>
      </Stack>
      <SimpleGrid
        columns={{ base: 1, lg: 1 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded={"md"}
            alt={"product image"}
            src={props.imagen}
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={{ base: "100%", sm: "400px", lg: "500px" }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={500}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {props.titular}
            </Heading>
            <Text
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={300}
              fontSize={"3xl"}
              marginTop="5"
            >
              {props.fechaDePublicacion}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 6, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text fontSize={"lg"}>{props.detalle}</Text>
            </VStack>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(
    "https://strapi.eunoia.es/uploads/noticias_78462d94b6.json"
  );
  const peliculas = await res.json();
  const slugs = peliculas.map((blog: any) => blog.slug);
  const paths = slugs.map((slug: any) => ({ params: { slug } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params: { slug } }) => {
  // Call an external API endpoint to get posts
  const res = await fetch(
    "https://strapi.eunoia.es/uploads/noticias_78462d94b6.json"
  );
  const peliculas = await res.json();
  const pel = peliculas.find((x: any) => x.slug === slug);

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      titular: pel.titular,
      slug: pel.titular,
      keywords: pel.keywords,
      fechaDePublicacion: pel.fechaDePublicacion,
      imagen: pel.imagen,
      detalle: pel.detalle,
    },
  };
};
export default BlogPage;
