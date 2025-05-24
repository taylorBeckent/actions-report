'use server';
import React from 'react';
import {useRouter} from "next/router";

const Page = (props) => {
    console.log(props);
    console.log(useRouter());
    const router = useRouter();
    const { params } = router;
    console.log(params);
    return (
        <div>
            123
        </div>
    );
};

export default Page;
