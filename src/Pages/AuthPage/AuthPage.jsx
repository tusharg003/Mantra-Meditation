import { Flex, useBreakpointValue } from '@chakra-ui/react';
import AuthPageLarge from './AuthPageLarge';
import AuthPageSmaller from './AuthPageSmaller';
const AuthPage = () => {
  const isLaptop = useBreakpointValue({ base: false, lg: true });

  return (
    <Flex w={'100vw'} h={'100vh'} bg={'gray.800'} p={0} alignItems={'center'}>
      {isLaptop ? <AuthPageLarge /> : <AuthPageSmaller />}
    </Flex>
  );
};
export default AuthPage;
