"use client";
import useRentModal from "@/app/hooks/useRentModal";
import React, { useMemo, useState } from "react";
import Modal from "./Modal";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";
import CountrySelect, { CountrySelectValues } from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal();

  const [step, setStep] = useState(STEPS.CATEGORY);
  const[isLoading,setIsLoading] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const bathroomCount = watch("bathroomCount");
  const roomCount = watch("roomCount");
  const imageSrc = watch('imageSrc')


  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );
  const setCustomValues = (id: string, value: any) => {
    // console.log(`Setting ${id} to`, value); // Debugging log
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => Math.max(value - 1, STEPS.CATEGORY));
  };

  const onNext = () => {
    setStep((value) => Math.min(value + 1, STEPS.PRICE));
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);



  const secondaryLabelAction = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  const onSubmit = handleSubmit((data) => {
    if (step !== STEPS.PRICE) {
      onNext();
    } else {
      axios.post('api/listings',data).then(()=>{
        toast.success('Listing created!')
        router.refresh()
        reset()
        setStep(STEPS.CATEGORY)
        rentModal.onClose();
      }).catch((err)=>toast.error('Something went Wrong'))
      
      console.log(data); 
    }
  });

  let bodyContent;
  switch (step) {
    case STEPS.CATEGORY:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title={"Which of these describes your place"}
            subtitle={"Pick a Category"}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto">
            {categories.map((item) => (
              <div key={item.label} className="col-span-1">
                <CategoryInput
                  onClick={(category) => setCustomValues("category", category)}
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            ))}
          </div>
        </div>
      );
      break;
    case STEPS.LOCATION:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Where is your place located?"
            subtitle="Help guests find you!"
          />
          <CountrySelect
            value={location as CountrySelectValues}
            onChange={(value) => setCustomValues("location", value)}
          />
          <Map />
        </div>
      );
      
      break;

      case STEPS.INFO:
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading title="Tell some basics about your place" subtitle="What amenities do you have?" />
            <Counter
              title="Number of Guests"
              subtitle="How many guests can your place accommodate?"
              value={guestCount}
              onChange={(value) => setCustomValues("guestCount", value)}
            />
            <Counter
              title="Rooms"
              subtitle="How many rooms you want?"
              value={roomCount}
              onChange={(value) => setCustomValues("roomCount", value)}
            />
            <Counter
              title="Bathroom"
              subtitle="How many bathroom do you have?"
              value={bathroomCount}
              onChange={(value) => setCustomValues("bathroomCount", value)}
            />
            {/* You can add more Counters for roomCount and bathroomCount similarly */}
          </div>
        );
        break;
        case STEPS.IMAGES:
          bodyContent=(
            <div className="flex flex-col gap-8"> 
              <Heading title="Add a photo of your place" subtitle="Show Guests what your place look like"/>
              <ImageUpload value={imageSrc} onChange={(value)=>setCustomValues('imageSrc',value)}/>
            </div>
          )
        
        break;

        case STEPS.DESCRIPTION:
          bodyContent=(
            <div className="flex flex-col gap-4">
              <Heading title="How Would You describe your place" subtitle="Short and Sweet works best!" />
              <Input
              id="title"
              label="title"
              register={register}
              errors={errors}
              required
              disabled={isLoading}
              />
              <hr/>
              <Input
              id="description"
              label="description"
              register={register}
              errors={errors}
              required
              disabled={isLoading}
              />
            </div>
          )
          break;
          
          case STEPS.PRICE:
            bodyContent=(
              <div className="flex flex-col gap-8">
                <Heading title="Now Set your Price"subtitle="How much do You Charge for one Night"/>
                <Input
                  id="price"
                  label="Price"
                  formatPrice={true}
                  type="number"
                  register={register}
                  errors={errors}
                  required
                />
              </div>
            )
            break;
        default:
      bodyContent = <div>Content for other steps</div>;
      break;
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      title={"Airbnb your home"}
      onClose={rentModal.onClose}
      onSubmit={onSubmit}
      actionLabel={actionLabel}
      secondaryLabel={secondaryLabelAction}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default RentModal;
