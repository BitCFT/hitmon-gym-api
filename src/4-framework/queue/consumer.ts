import amqp from 'amqplib';

const queue = 'hello';

(async () => {
  try {
    const connection = await amqp.connect('amqp://rabbitmq');
    const channel = await connection.createChannel();

    process.once('SIGINT', async () => {
      await channel.close();
      await connection.close();
    });

    await channel.assertQueue(queue, { durable: false });
    await channel.consume(
      queue,
      message => {
        if (message) {
          console.log(JSON.stringify(JSON.parse(message.content.toString()), null, 2));
        }
      },
      { noAck: true }
    );

    console.log(' [*] Waiting for messages. To exit press CTRL+C');
  } catch (err) {
    console.warn(err);
  }
})();
