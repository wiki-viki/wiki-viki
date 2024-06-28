import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cardType } from '@/types/UserCardProps';
import { WIKI_BASE_URL } from '@/constants/url';
import BasicProfileImage from '@/../public/images/basic_profile.png';
import CopyLinkButton from '../common/CopyLinkButton';

interface CardListProps {
  cardList: cardType[];
}

const UserCard = ({ cardList }: CardListProps) => {
  return (
    <div className="relative mt-14 h-3/5 w-full">
      {cardList.map((card) => {
        return (
          <motion.div
            key={card.id}
            className="wikilist-card"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.15 }}
          >
            <Link href={`/wiki/${card.name}`} rel="preload">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className=" relative size-[85px] rounded-full ">
                    <Image
                      src={card.image || BasicProfileImage}
                      alt="프로필 이미지"
                      layout="fill"
                    />
                  </div>
                  <div className="ml-8 text-grayscale-400 ">
                    <h3 className="truncate text-2xl-semibold text-grayscale-500 sm:text-xl-semibold">
                      {card.name}
                    </h3>
                    <div className="mt-4 text-md-regular sm:mt-[10px] sm:text-xs-regular">
                      {card.city}, {card.nationality}
                      <div>{card.job}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            <div className="absolute bottom-0 right-0 mb-6 mr-9 ">
              <CopyLinkButton url={`${WIKI_BASE_URL}${card.name}`} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default UserCard;
