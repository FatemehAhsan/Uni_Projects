#In the name of God

from socket import *
import ssl
import base64

mailServer = "smtp.gmail.com"

port = 587

to = "*@gmail.com"

From = "*@gmail.com"

emailMessage = "Hi Fateme"

domainName = "Fateme"

SMTPSocket = socket(AF_INET, SOCK_STREAM)
SMTPSocket.connect((mailServer, port))

rcv = SMTPSocket.recv(1024)
print(rcv)

command = "HELO "+ domainName +"\r\n"
SMTPSocket.send(command.encode())

rcv = SMTPSocket.recv(1024)
print(rcv)

command = 'STARTTLS\r\n'
SMTPSocket.send(command.encode())

rcv = SMTPSocket.recv(1024)
print(rcv)

sslSMTPSocket = ssl.wrap_socket(SMTPSocket)

command = "AUTH LOGIN\r\n"
sslSMTPSocket.send(command.encode())

rcv = sslSMTPSocket.recv(1024)
print(rcv)

encoded = base64.b64encode(From.encode())
command = encoded.decode('ascii') + "\r\n"
sslSMTPSocket.send(command.encode())

rcv = sslSMTPSocket.recv(1024)
print(rcv)

# *********** password removed for security
encoded = base64.b64encode("***********".encode())
command = encoded.decode('ascii') + "\r\n"
sslSMTPSocket.send(command.encode())

rcv = sslSMTPSocket.recv(1024)
print(rcv)

command = "MAIL FROM: <" + From + ">\r\n"
sslSMTPSocket.send(command.encode())

rcv = sslSMTPSocket.recv(1024)
print(rcv)

command = "RCPT TO: <" + to + ">\r\n"
sslSMTPSocket.send(command.encode())

rcv = sslSMTPSocket.recv(1024)
print(rcv)

command = 'DATA\r\n'
sslSMTPSocket.send(command.encode())

rcv = sslSMTPSocket.recv(1024)
print(rcv)

command = emailMessage + "\r\n"
sslSMTPSocket.send(command.encode())

command = ".\r\n"
sslSMTPSocket.send(command.encode())

rcv = sslSMTPSocket.recv(1024)
print(rcv)

command = 'QUIT\r\n'
sslSMTPSocket.send(command.encode())

rcv = sslSMTPSocket.recv(1024)
print(rcv)

sslSMTPSocket.close()
