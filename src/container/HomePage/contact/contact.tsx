"use client";

import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useFormStatus } from "react-dom";
import style from "./contact.module.scss";
import { ContactAnimations } from "./animations";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/lib/actions";
import { Button, Heading, Input } from "@/components/ui";

const Contact = () => {
  const { ref } = useSectionInView("İletişim");
  const { pending } = useFormStatus();

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
            className="flex flex-col items-center gap-4 dark:text-black"
            action={async (formData) => {
              const { data, error } = await sendEmail(formData);

              if (error) {
                toast.error(error);
                return;
              }

              toast.success("Email sent successfully!");
            }}
          >
            <div className=" flex flex-col gap-4 max-w-3xl">
              <strong className="!text-left px-4 rounded">
                {" "}
                İletişime geçmek istiyorsanız
                <a
                  className="text-red-900"
                  href="mailto:bedirhan.sayy@outlook.com"
                >
                  {" "}
                  bu linke{" "}
                </a>
                tıklayarak mail uygulamanız üzerinden bana mail atabilir yada
                mesajınızı buraya yazabilirsiniz.
              </strong>
              <Input
                name="senderEmail"
                type="email"
                required
                maxLength={500}
                placeholder="E-mail adresiniz"
              />
              <Input
                name="message"
                placeholder="Mesajınız"
                required
                type="textarea"
                maxLength={5000}
              />
              <Button variant="outline" className="" status={pending}>
                Gönder
              </Button>
            </div>

            <div className="flex gap-4 ">
              <div className="w-full flex flex-col gap-4"></div>
            </div>
          </form>
          {/* <div className={style["tap"]}>
            <p>Fikriniz mi var?</p>
            <span className="animate-ping">
              <FaRegHandPointer />
            </span>
          </div> */}
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
