# generate_audio_files.py
import boto3
from names import number_nicknames

# Replace the following with your AWS access and secret keys
AWS_ACCESS_KEY = 'AWS_ACCESS_KEY'
AWS_SECRET_KEY = 'AWS_SECRET_KEY'

# Create a session with your AWS credentials
session = boto3.Session(aws_access_key_id=AWS_ACCESS_KEY, aws_secret_access_key=AWS_SECRET_KEY)

# Initialize the Amazon Polly client with the session
polly_client = session.client('polly')

# Loop through the numbers and generate audio files for each nickname
for number, nickname in number_nicknames.items():
    # Define the parameters for the Amazon Polly service
    response = polly_client.synthesize_speech(
        Text=nickname,
        OutputFormat='mp3',
        VoiceId='Nicole'  # You can choose a different voice ID here
    )
    
    # Write the audio data to a file
    with open(f'{number}.mp3', 'wb') as file:
        file.write(response['AudioStream'].read())
