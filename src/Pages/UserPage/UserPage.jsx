import { Button, Container, Flex, Text, VStack } from '@chakra-ui/react';
import useData from '../../Hooks/useData';
import { SlHome } from 'react-icons/sl';
import { Link } from 'react-router-dom';

const UserPage = () => {
  const initialData = useData();

  return (
    <Container maxW={'container.sm'} justifyContent={'center'}>
      <VStack alignItems={'center'}>
        <Text fontSize={{ base: '1.5em', md: '2em' }}>
          Welcome, {initialData.username}!
        </Text>
        <Flex alignItems={'center'} justifyContent={'space-between'} w={'100%'}>
          <Flex direction={'column'} gap={1}>
            <Text fontSize={{ base: 'md', md: 'lg' }}>
              Total Chants: {initialData.totalCount}
            </Text>{' '}
            <Text fontSize={{ base: 'md', md: 'lg' }}>
              Equivalent to {Math.floor(initialData.totalCount / 108)} maala
              {initialData.totalCount / 108 < 2 ? null : 's'}.
            </Text>
          </Flex>
          <Button
            as={Link}
            to={'/'}
            cursor={'pointer'}
            _hover={{ transform: 'scale(1.1)' }}
            borderRadius={'50%'}
            p={2}>
            <SlHome size={'1.3em'} />
          </Button>
        </Flex>
      </VStack>
    </Container>
  );
};

export default UserPage;
