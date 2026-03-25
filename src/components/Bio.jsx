import { motion } from 'framer-motion'

export default function Bio() {
  return (
    <motion.section
      className="bio"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="bio-inner">
        <div className="bio-label">About</div>
        <div className="bio-text">
          <p>
            Rodrigo stumbled into Airtable in 2019 while putting together Lunch & Learns at WeWork.
            What started as a curiosity turned into something much bigger.
          </p>
          <p>
            Trained as an architect, he already thought in systems and stories. Relational databases
            and data modeling just gave him a new medium. By 2020 he was deep enough to enroll in a
            software engineering immersive, which landed him his first Airtable contract at Netflix
            in 2021. From there: Airtable Platform Manager at People Inc., supporting 28 digital
            content brands. Then in 2024, Apple Music.
          </p>
          <p>
            To Rodrigo, Airtable is architecture by another name. A way of telling stories through
            structure and visuals. He's been building with it ever since, for clients and for fun.
          </p>
        </div>
      </div>
    </motion.section>
  )
}
