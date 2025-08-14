import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { SignUpContainer } from '../components/SignUp';

describe('SignUp', () => {
    describe('SignUpContainer', () => {
        it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
            const onSubmit = jest.fn();
            render(<SignUpContainer onSubmit={onSubmit} />);

            fireEvent.changeText(screen.getByPlaceholderText('Username'), 'testuser');
            fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password123');
            fireEvent.changeText(
                screen.getByPlaceholderText('Password confirmation'),
                'password123',
            );
            fireEvent.press(screen.getByTestId('submitButton'));

            await waitFor(() => {
                expect(onSubmit).toHaveBeenCalledTimes(1);
                expect(onSubmit.mock.calls[0][0]).toEqual({
                    username: 'testuser',
                    password: 'password123',
                    passwordConfirmation: 'password123',
                });
            });
        });
    });
});
