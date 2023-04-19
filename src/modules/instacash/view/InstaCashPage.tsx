import {
  Box,
  Center,
  Divider,
  FormHelperText,
  HStack,
  Heading,
  Input,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useUpdateEffect } from "@chakra-ui/hooks";
import { ChildWithLabel } from "../components";
import { GroupStats, Stat } from "../components/stats";
import { useInstaCashCampaign } from "../controllers/useCampaign";
import { Suspense, useEffect, useMemo, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { cuotasAtom, amountAtom } from "../domain/atoms";
import { useAtom, useAtomValue } from "jotai";
import { useCalculateCuota } from "../controllers/use-calculate-cuota";
import { debounce } from "../../../utils";
const AmountInput = () => {
  const [amount, setAmount] = useAtom(amountAtom);
  const [localamount, setLocalAmount] = useState<string | number>(0);
  const { data } = useInstaCashCampaign();
  useUpdateEffect(() => {
    if (localamount !== "" && typeof localamount === "number") {
      setAmount(localamount);
    }
  }, [localamount]);

  return (
    <ChildWithLabel label="Ingresa un monto">
      <InputGroup>
        <InputLeftElement>
          <Text>S/</Text>
        </InputLeftElement>
        <Input
          type="number"
          value={localamount}
          min={0}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (e.target.value === "") {
              setLocalAmount("");
              return;
            }
            if (value >= 0) {
              setLocalAmount(value);
            } else {
              setLocalAmount(0);
            }
          }}
          variant={"flushed"}
        />
      </InputGroup>
      <FormHelperText textColor={"blackAlpha.600"} fontSize={"sm"}>
        Mínimo S/{data?.min_amount} - Máximo S/{data?.max_amount}
      </FormHelperText>
    </ChildWithLabel>
  );
};

const CuotaSlider = () => {
  const { data } = useInstaCashCampaign();
  const [cuota, setCuota] = useAtom(cuotasAtom);
  return (
    <ChildWithLabel label="Elige el número de cuotas">
      <Box>
        <Slider
          min={0}
          value={cuota}
          max={data?.max_quota}
          onChange={(e) => {
            setCuota(e);
          }}
          aria-label="slider-ex-1"
          defaultValue={30}
        >
          <SliderTrack height={"12px"} rounded={"full"}>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb
            width={"25px"}
            shadow={"xl"}
            borderWidth={"1px"}
            borderColor={"gray.200"}
            height={"25px"}
          />
        </Slider>
        <HStack justifyContent={"space-between"}>
          <Text fontWeight={"bold"} color="blue.600">
            {cuota} cuotas
          </Text>
          <Text textColor={"blackAlpha.600"}>Máximo:{data?.max_quota}</Text>
        </HStack>
      </Box>
    </ChildWithLabel>
  );
};

const DisplayCuota = () => {
  const [localAmount, setLocaAmount] = useState(0);

  const amount = useAtomValue(amountAtom);
  const cuota = useAtomValue(cuotasAtom);

  const { mutateAsync } = useCalculateCuota();
  const debouncerCalculation = useMemo(() => {
    return debounce((amount: number, cuota: number) => {
      return mutateAsync({ amount, cuota }).then((res) => {
        setLocaAmount(res.monthly_amount);
      });
    }, 500);
  }, [mutateAsync]);

  useEffect(() => {
    debouncerCalculation(amount, cuota);
  }, [amount, cuota, debouncerCalculation]);

  return (
    <Box textAlign={"center"}>
      <Text pb="0" mb="0">
        Tu cuota mensual será:
      </Text>
      <Text mt="" fontSize={"2xl"} fontWeight={"bold"}>
        S/.{localAmount ? localAmount.toFixed(2) : 0}
      </Text>
    </Box>
  );
};

const ChildInstaCashPage = () => {
  const { data: campaign } = useInstaCashCampaign();

  return (
    <Center w="100vw" h="100vh" bg="blue.400">
      <Box bg="white" p="5" py="14" rounded={"xl"} width={"30rem"}>
        <Box>
          <Heading mb="2" fontSize={"2xl"}>
            Simula tu cuota
          </Heading>
          <Divider borderColor={"red"} w="6%" borderWidth={"2px"} />
        </Box>
        <VStack>
          <VStack
            border={"2px"}
            borderColor={"gray.200"}
            w="full"
            rounded={"md"}
            py="4"
            my="9"
          >
            <DisplayCuota />
            <GroupStats>
              <Stat label="Cuotas">{campaign?.max_quota}</Stat>
              <Stat label="Tea">{campaign?.tea}%</Stat>
              <Stat label="Pago 1° cuota">{campaign?.payment_date}</Stat>
            </GroupStats>
          </VStack>
          <AmountInput />
          <CuotaSlider />
        </VStack>
      </Box>
    </Center>
  );
};

export const InstaCashPage = () => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => {
        return (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={() => {
              return <div>Something went wrong</div>;
            }}
          >
            <Suspense fallback={<div>loading</div>}>
              <ChildInstaCashPage />
            </Suspense>
          </ErrorBoundary>
        );
      }}
    </QueryErrorResetBoundary>
  );
};
