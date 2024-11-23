import { verifyCloudProof } from '@worldcoin/idkit';

import { NextResponse } from 'next/server';

export default async function POST(req) {
  const { proof, signal } = req.body
    const app_id = process.env.NEXT_PUBLIC_WORLDCOIN_APP_ID
    const action = process.env.NEXT_PUBLIC_WORLDCOIN_ACTION_ID
	const verifyRes = await verifyCloudProof(
        proof,
        app_id,
        action,
        signal
    );

    if (verifyRes.success) {
        // This is where you should perform backend actions if the verification succeeds
        // Such as, setting a user as "verified" in a database
        return NextResponse.json({ verifyRes });
    } else {
        // This is where you should handle errors from the World ID /verify endpoint. 
        // Usually these errors are due to a user having already verified.
        return NextResponse.json({ error: verifyRes });
    }
}