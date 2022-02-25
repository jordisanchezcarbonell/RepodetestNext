import NextLink from "next/link";
import { Link, Flex, Box, Heading } from "@chakra-ui/react";
import { NextPage, GetStaticProps } from "next";
import {
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  SpaceProps,
  useColorModeValue,
  Container,
  VStack,
  Center,
  chakra,
} from "@chakra-ui/react";

const BlogIndexPage: NextPage<{
  peliculas: {
    slug: string;
    keywords: string;
    fechaDePublicacion: string;
    titular: string;
    imagen: string;
    detalle: string;
  }[];
}> = (props) => {
  return (
    <Container maxW={"7xl"} p="12">
      <Heading as="h2" marginTop="5">
        Latest articles {props.peliculas.length}
      </Heading>
      <Divider marginTop="5" />

      {props.peliculas.map((x) => {
        return (
          <Flex
            bg={useColorModeValue("#F9FAFB", "gray.600")}
            p={50}
            w="full"
            alignItems="center"
            justifyContent="center"
            float="left"
          >
            <Box
              mx="auto"
              rounded="lg"
              shadow="md"
              bg={useColorModeValue("white", "gray.800")}
              maxW="2xl"
            >
              <Image
                roundedTop="lg"
                w="full"
                h={64}
                fit="cover"
                src={x.imagen}
                alt="Article"
              />

              <Box p={6}>
                <Box>
                  <chakra.span
                    fontSize="xs"
                    textTransform="uppercase"
                    color={useColorModeValue("brand.600", "brand.400")}
                  >
                    {x.fechaDePublicacion}
                  </chakra.span>
                  {/* <NextLink
                    as={`/detalles/${x.slug}`}
                    href={{
                      pathname: `/detalles/[slug]`,
                      query: { data: JSON.stringify(x) },
                    }}
                    passHref
                    key={`/detalles/${x.slug}`}
                  > */}
                  <NextLink
                    as={`/detalles/${x.slug}`}
                    href={`/detalles/[slug]`}
                    passHref
                    key={`/detalles/${x.slug}`}
                  >
                    <Link
                      display="block"
                      color={useColorModeValue("gray.800", "white")}
                      fontWeight="bold"
                      fontSize="2xl"
                      mt={2}
                      _hover={{ color: "gray.600", textDecor: "underline" }}
                    >
                      {x.titular}
                    </Link>
                  </NextLink>
                </Box>
              </Box>
            </Box>
          </Flex>
        );
      })}
    </Container>
  );
  // <Box>
  //   <Flex flexDirection="column" alignItems="center">
  //     <Heading marginY="2rem">Table of Contents</Heading>
  //     {props.peliculas.map((x) => {
  //       return (
  //         <NextLink
  //           as={`/detalles/${x.slug}`}
  //           href={{
  //             pathname: `/detalles/[slug]`,
  //             query: { data: JSON.stringify(x) },
  //           }}
  //           passHref
  //           key={`/detalles/${x.slug}`}
  //         >
  //           <Link>
  //             <Image
  //               boxSize="100px"
  //               objectFit="cover"
  //               src={x.imagen}
  //               alt="Dan Abramov"
  //             />

  //             {x.fechaDePublicacion}

  //             <Heading as="h3" size="lg">
  //               {x.titular}
  //             </Heading>
  //           </Link>
  //         </NextLink>
  //       );
  //     })}
  //   </Flex>
  // </Box>
};
// This function gets called at build time
export const getStaticProps: GetStaticProps = async () => {
  // Call an external API endpoint to get posts
  const res = await fetch(
    "https://strapi.eunoia.es/uploads/noticias_78462d94b6.json"
  );
  const peliculas = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      peliculas,
    },
  };
};

export default BlogIndexPage;
