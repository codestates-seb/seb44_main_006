package com.seb_main_006.domain.bookmark.service;

import com.seb_main_006.domain.bookmark.repository.BookmarkRepository;
import com.seb_main_006.domain.member.entity.Member;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;

    public BookmarkService(BookmarkRepository bookmarkRepository) {
        this.bookmarkRepository = bookmarkRepository;
    }

    public int getBookmarkCount(Member member) {
        return bookmarkRepository.countBookmarksByMember(member);
    }

}
