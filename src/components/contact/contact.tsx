"use client";

import React from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Heading } from "../ui";
import { useSectionInView } from "@/lib/hooks";
import { Button } from "../ui/button/button";
import { sendEmail } from "@/lib/actions/_sendMail.action";
import { ContactAnimations } from "./animations";
import style from "./contact.module.scss";
import { useFormStatus } from "react-dom";
import { FaRegHandPointer } from "react-icons/fa";

export const Contact = () => {
  const { ref } = useSectionInView("Contact");
  const { pending } = useFormStatus();

  return (
    <motion.section
      id="contact"
      ref={ref}
      className={style["section-wrapper"]}
      {...ContactAnimations.wrapper}
    >
      <Heading title="Contact Me" link="contact" />
      <div>
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
              className="h-14 px-4 rounded-lg  dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
              name="senderEmail"
              type="email"
              required
              maxLength={500}
              placeholder="Your email"
            />
            <textarea
              className="h-52 my-3 rounded-lg borderBlack p-4 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
              name="message"
              placeholder="Your message"
              required
              maxLength={5000}
            />

            <Button status={pending} />
          </form>
          <div className={style["tap"]}>
            <p>Fikriniz mi var?</p>
            <span className="animate-ping">
              <FaRegHandPointer />
            </span>
          </div>
          <span className="!mt-20 text-white !text-center font-semibold text-lg">
            Copyright Bedirhan Say 2023 all Rights Reserved
          </span>
        </div>
      </div>
    </motion.section>
  );
};
