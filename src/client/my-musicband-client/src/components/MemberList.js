// client/src/components/MemberList.js
import React from 'react';
import MemberItem from './MemberItem';
import './MemberList.css';

function MemberList({ members }) {
    return (
        <div className="member-list">
            {members.map(member => (
                <MemberItem
                    key={member._id}
                    name={member.name}
                    role={member.role}
                    image={member.image}
                    bio={member.bio}
                    slug={member.slug} // Truyền slug, không truyền link
                />
            ))}
        </div>
    );
}

export default MemberList;