import { useState, useEffect } from 'react';
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
  Flex,
  VStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  InputGroup,
  InputLeftAddon,
  Input,
  Radio,
  Text,
  GridItem,
  Grid,
} from '@chakra-ui/react';
import {
  SlControlPause,
  SlControlPlay,
  SlLogout,
  SlReload,
  SlSettings,
} from 'react-icons/sl';
import '../font.css'; // Import the fonts.css file

const Home = () => {
  const [isBlinking, setIsBlinking] = useState(true); // to control the blinking action
  const [val, setVal] = useState(100); // speed of the blink
  const [count, setCount] = useState(0); // count of the number of blinks
  const [pause, setPause] = useState(true);
  const [selectedFont, setSelectedFont] = useState();
  const [chant, setChant] = useState('Naam');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const buttons = [
    { name: 'English-1', value: 'english-1' },
    { name: 'English-2', value: 'english-2' },
    { name: 'English-3', value: 'english-3' },
    { name: 'English-4', value: 'english-4' },
    { name: 'हिंदी', value: 'hindi' },
    { name: 'Hindi-en1', value: 'hindi-en1' },
    { name: 'Hindi-en2', value: 'hindi-en2' },
    { name: 'Typewriter', value: 'typeWriter' },
    { name: 'Cookie Monster', value: 'cookieMonster' },
  ];
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
  const handleSettingModalOpen = () => {
    setPause(true);
    onOpen();
  };
  const handleModalClose = () => {
    setIsBlinking(true);
    onClose();
  };
  const handleResetCount = () => {
    setCount(0);
    setIsBlinking(true);
    setPause(true);
  };
  return (
    <>
      <VStack pb={5} h={'100vh'} bg={'gray.800'} justifyContent={'center'}>
        <Flex
          fontSize={{ base: '4em', md: '8em', lg: '10em' }}
          w={'90%'}
          justifyContent={'center'}
          alignItems={'center'}
          flexGrow={1}
          fontFamily={selectedFont}
          css={{
            opacity: isBlinking ? 1 : 0,
            transition: `opacity ${calculateTransitionDuration()} ease-in-out`,
          }}>
          {chant}
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
          <Box
            cursor={'pointer'}
            _hover={{ transform: 'scale(1.1)' }}
            onClick={handleSettingModalOpen}>
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
          <Box
            cursor={'pointer'}
            _hover={{ transform: 'scale(1.1)' }}
            onClick={handleResetCount}>
            <SlReload size={'1.2em'} />
          </Box>

          <Box cursor={'pointer'} _hover={{ transform: 'scale(1.1)' }}>
            <SlLogout size={'1.2em'} />
          </Box>
        </Flex>
      </VStack>

      {/* Settings Modal  */}
      <Modal isOpen={isOpen} onClose={onClose} size={'2xl'} isCentered>
        <ModalOverlay />
        <ModalContent py={2}>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup>
              <InputLeftAddon bg={'transparent'}>
                <Text fontWeight={700} fontSize={'lg'}>
                  Chant :{' '}
                </Text>
              </InputLeftAddon>
              <Input
                variant={'flushed'}
                type='text'
                placeholder='Enter the chant'
                value={chant}
                onChange={(e) => setChant(e.target.value)}
              />
            </InputGroup>

            <VStack gap={3} my={5}>
              <Grid
                templateColumns={{
                  base: '1fr',
                  md: 'repeat(4, 1fr)',
                }}
                gap={3}>
                <Text fontWeight={700} fontSize={'lg'}>
                  Font Style :{' '}
                </Text>
                {buttons.map((button) => (
                  <GridItem key={button.value}>
                    <Radio
                      value={button.value}
                      onChange={() => setSelectedFont(button.value)}
                      isChecked={selectedFont === button.value}>
                      {button.name}
                    </Radio>
                  </GridItem>
                ))}
              </Grid>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleModalClose}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Home;
