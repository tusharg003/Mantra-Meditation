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
  SlUser,
} from 'react-icons/sl';
import { VscTextSize } from 'react-icons/vsc';
import '../font.css'; // Import the fonts.css file
import useData from '../Hooks/useData';
import { Link } from 'react-router-dom';

const Home = () => {
  const initialData = useData();
  const [isBlinking, setIsBlinking] = useState(true); // to control the blinking action
  const [val, setVal] = useState(100); // speed of the blink
  const [count, setCount] = useState(0); // count of the number of blinks
  const [totalCount, setTotalCount] = useState(initialData.totalCount);
  const [pause, setPause] = useState(true);
  const [selectedFont, setSelectedFont] = useState(initialData.font);
  const [chant, setChant] = useState(initialData.text);
  const [username, setUserName] = useState(initialData.username);
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
  const [fontsize, setFontSize] = useState(initialData.fontSize);
  const textSizes = ['2em', '3em', '4em', '6em', '8em', '10em'];

  const handleChange = (newVal) => {
    const reverseVal = 100 - newVal;
    setVal(reverseVal);
  };

  // Function to calculate transition duration based on reversedVal
  const calculateTransitionDuration = () => {
    return `${val * 0.001}s`; // Adjust the multiplier based on your requirements
  };
  useEffect(() => {
    // Check if it's the first visit
    const isFirstVisit = !initialData.hasVisited;

    // If it's the first visit, open the modal
    if (isFirstVisit) {
      onOpen();
      // Set a flag in initialData to indicate that the modal has been opened
      initialData.hasVisited = true;
      handleLocalStorageUpdation();
    }
  }, []);

  useEffect(() => {
    let blinkInterval;

    if (!pause) {
      blinkInterval = setInterval(() => {
        setIsBlinking((prevIsBlinking) => !prevIsBlinking);
        if (!isBlinking) {
          setCount((prevCount) => prevCount + 1);
          setTotalCount((prevCount) => prevCount + 1);
          handleLocalStorageUpdation();
        }
      }, val * 5);
    }
    return () => {
      clearInterval(blinkInterval);
    };
  });
  // call this effect if val, count, isBlink, or pause changes

  const handlePauseToggle = () => {
    setPause((prevPause) => !prevPause);
    setIsBlinking(true);
  };
  const handleSettingModalOpen = () => {
    setPause(true);
    onOpen();
  };
  const handleLocalStorageUpdation = () => {
    initialData.updateData({
      font: selectedFont,
      username: username,
      text: chant,
      totalCount: totalCount,
      hasVisited: true,
      fontSize: fontsize,
    });
  };
  const handleModalClose = () => {
    setIsBlinking(true);
    handleLocalStorageUpdation();
    onClose();
  };
  const handleResetCount = () => {
    setCount(0);
    setIsBlinking(true);
    setPause(true);
    handleLocalStorageUpdation();
  };
  const handleTextSize = () => {
    const nextIndex = (fontsize + 1) % textSizes.length;
    setFontSize(nextIndex);
    handleLocalStorageUpdation();
  };

  return (
    <>
      <VStack h={{ base: '90vh', md: '100vh' }} bg={'gray.800'}>
        <Flex
          // fontSize={{ base: '4em', md: '8em', lg: '10em' }}
          fontSize={textSizes[fontsize]}
          w={'90%'}
          justifyContent={'center'}
          alignItems={'center'}
          mt={'40'}
          fontFamily={selectedFont}
          css={{
            opacity: isBlinking ? 1 : 0,
            transition: `opacity ${calculateTransitionDuration()} ease-in-out`,
          }}>
          {chant}
        </Flex>
        <Flex
          pos={'absolute'}
          bottom={0}
          w={{ base: '80%', md: '50%' }}
          my={3}
          gap={5}
          justifyContent={'center'}
          direction={'column'}>
          <Text margin={'auto'}> {count}</Text>
          <Box>
            <Slider
              aria-label='slider-ex-1'
              onChangeEnd={handleChange}
              max={85}
              defaultValue={10}>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>
          <Flex
            mx={'auto'}
            w={'100%'}
            maxW={'500px'}
            justifyContent={'space-around'}
            mb={3}>
            <>
              <Box
                as={Link}
                to={`/aa`}
                cursor={'pointer'}
                _hover={{ transform: 'scale(1.1)' }}
                opacity={pause ? 1 : 0.2} // Make it partially transparent when pause is false
                pointerEvents={pause ? 'auto' : 'none'} // Enable pointer events when pause is true
              >
                <SlUser size={'1.2em'} />
              </Box>
              <Box
                cursor={'pointer'}
                _hover={{ transform: 'scale(1.1)' }}
                onClick={handleSettingModalOpen}
                opacity={pause ? 1 : 0.2} // Make it partially transparent when pause is false
                pointerEvents={pause ? 'auto' : 'none'} // Enable pointer events when pause is true
              >
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
                onClick={handleResetCount}
                opacity={pause ? 1 : 0.2} // Make it partially transparent when pause is false
                pointerEvents={pause ? 'auto' : 'none'} // Enable pointer events when pause is true
              >
                <SlReload size={'1.2em'} />
              </Box>
              <Box
                as={Link}
                // to={'/auth'}
                cursor={'pointer'}
                _hover={{ transform: 'scale(1.1)' }}
                opacity={pause ? 1 : 0.2} // Make it partially transparent when pause is false
                pointerEvents={pause ? 'auto' : 'none'} // Enable pointer events when pause is true
              >
                <SlLogout size={'1.2em'} />
              </Box>{' '}
              <Box
                cursor={'pointer'}
                _hover={{ transform: 'scale(1.1)' }}
                onClick={handleTextSize}
                opacity={pause ? 1 : 0.2} // Make it partially transparent when pause is false
                pointerEvents={pause ? 'auto' : 'none'} // Enable pointer events when pause is true
              >
                <VscTextSize size={'1.2em'} />
              </Box>
            </>
          </Flex>
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
                  Name :{' '}
                </Text>
              </InputLeftAddon>
              <Input
                variant={'flushed'}
                type='text'
                placeholder='Enter your Name'
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </InputGroup>{' '}
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
            <VStack gap={3} px={4} my={5} alignItems={'flex-start'}>
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
