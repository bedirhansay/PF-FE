"use client";

import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useSectionInView } from "@hooks";
import { Button, Heading } from "@components/ui";
import { sendEmail } from "@actions";
import { useFormStatus } from "react-dom";
import style from "./contact.module.scss";
import { ContactAnimations } from "./animations";

export const Contact = () => {
  const { ref } = useSectionInView("İletişim");
  const { pending } = useFormStatus();
  console.log("Contact", pending);

  return (
    <motion.section
      id="contact"
      ref={ref}
      className={style["section"]}
      {...ContactAnimations.wrapper}
    >
      <Heading title="İletişim" link="contact" />
      <div className={style["section-wrapper"]}>
        <div className={style["banner"]}>
          <form
            className="flex flex-col dark:text-black"
            action={async (formData) => {
              const { data, error } = await sendEmail(formData);

              console.log("data", error);

              if (error) {
                toast.error(error);
                return;
              }

              toast.success("Email sent successfully!");
            }}
          >
            <input
              className="h-14 px-4 rounded-lg dark:focus:bg-opacity-900 border-2 border-darkBlue transition-all dark:outline-none text-white bg-darkBlue placeholder:text-white"
              name="senderEmail"
              type="email"
              required
              maxLength={500}
              placeholder="Your email"
            />
            <textarea
              className="h-52 my-3  border-2  p-4 dark:focus:bg-opacity-100 transition-all dark:outline-none  bg-darkBlue text-white placeholder:text-white rounded-md "
              name="message"
              placeholder="Your message"
              required
              maxLength={5000}
            />

            <Button variant="secondary" className="" status={pending}>
              Gönder
            </Button>
          </form>
          {/* <div className={style["tap"]}>
            <p>Fikriniz mi var?</p>
            <span className="animate-ping">
              <FaRegHandPointer />
            </span>
          </div> */}
          <span className=" text-white  backdrop-blur-md !text-end pl-2 py-2 rounded w-full font-semibold text-lg">
            Copyright Bedirhan Say 2023 all Rights Reserved
          </span>
        </div>
      </div>
    </motion.section>
  );
};
