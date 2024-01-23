import { useState, useEffect } from 'react';
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
  Flex,
  VStack,
} from '@chakra-ui/react';
import {
  SlControlPause,
  SlControlPlay,
  SlLogout,
  SlSettings,
} from 'react-icons/sl';

const Home = () => {
  const [isBlinking, setIsBlinking] = useState(true); // to control the blinking action
  const [val, setVal] = useState(100); // speed of the blink
  const [count, setCount] = useState(0); // count of the number of blinks
  const [pause, setPause] = useState(false);

  const handleChange = (newVal) => {
    const reverseVal = 100 - newVal;
    setVal(reverseVal);
  };

  // Function to calculate transition duration based on reversedVal
  const calculateTransitionDuration = () => {
    return `${val * 0.001}s`; // Adjust the multiplier based on your requirements
  };

  useEffect(() => {
    let blinkInterval;

    if (!pause) {
      blinkInterval = setInterval(() => {
        setIsBlinking((prevIsBlinking) => !prevIsBlinking);
        if (!isBlinking) {
          // essentially when blinks count increases, false taken for the right time updating
          setCount((prevCount) => prevCount + 1);
        }
      }, val * 5);
    }

    return () => {
      clearInterval(blinkInterval);
    };
  }, [val, count, isBlinking, pause]); // call this effect if val, count, isBlink, or pause changes

  const handlePauseToggle = () => {
    setPause((prevPause) => !prevPause);
  };

  return (
    <VStack pb={5} h={'100vh'} bg={'gray.800'} justifyContent={'center'}>
      <Flex
        fontSize={{ base: '4em', md: '8em', lg: '10em' }}
        w={'90%'}
        justifyContent={'center'}
        alignItems={'center'}
        flexGrow={1}
        css={{
          opacity: isBlinking ? 1 : 0,
          transition: `opacity ${calculateTransitionDuration()} ease-in-out`,
        }}>
        NAME
      </Flex>
      <Box>{count}</Box>
      <Box w={'50%'} my={3}>
        <Slider
          aria-label='slider-ex-1'
          onChangeEnd={handleChange}
          max={85}
          defaultValue={0}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>

      <Flex w={'100%'} maxW={'500px'} justifyContent={'space-around'} mb={3}>
        <Box cursor={'pointer'} _hover={{ transform: 'scale(1.1)' }}>
          <SlSettings size={'1.2em'} />
        </Box>
        <Box
          cursor={'pointer'}
          _hover={{ transform: 'scale(1.1)' }}
          onClick={handlePauseToggle}>
          {pause ? (
            <SlControlPlay size={'1.2em'} />
          ) : (
            <SlControlPause size={'1.2em'} />
          )}
        </Box>

        <Box cursor={'pointer'} _hover={{ transform: 'scale(1.1)' }}>
          <SlLogout size={'1.2em'} />
        </Box>
      </Flex>
    </VStack>
  );
};

export default Home;
