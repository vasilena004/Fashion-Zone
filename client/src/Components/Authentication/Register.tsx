import Box from "@mui/material/Box";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import {
  CssBaseline,
  Typography,
  Avatar,
  Container,
  Button,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import TextInputField from "./TextInputField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Gender, User } from "../../model/User";
import RadioButton from "./RadioButton";
import { UserApi } from "../../services/user-service";

interface FormData {
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  email: string;
  gender: Gender;
  dateOfBirth: string;
}

interface RegisterProps {
  // addNewUser: (user: User) => void;
}

const radioBtnStyle = {
  color: "rgb(71, 11, 81)",
  "&.Mui-checked": {
    color: "rgb(71, 11, 81)",
  },
};

const schema = yup
  .object({
    firstName: yup.string().required("First name is required").min(2),
    lastName: yup.string().required("Last name is required").min(2),
    password: yup
      .string()
      .required()
      .matches(/^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{4,}$/, {
        message: "Invalid password",
      }),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match!"),
    email: yup
      .string()
      .required("Email is required")
      .email("Email must be a valid email"),
    dateOfBirth: yup
      .string()
      .matches(
        /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
        "Invalid date format (dd/mm/yyyy)"
      ),
  })
  .required();

export default function Register() {
  const navigate=useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const registerUser = async (user: FormData) => {
    const email = user.email;
    const firstName = user.firstName;
    const lastName = user.lastName;
    const password = user.password;
    const gender = user.gender;
    const dateOfBirth = user.dateOfBirth;
    const registrationAt = new Date().toISOString();
    const timeOfLastModification = new Date().toISOString();

    const created = await UserApi.create(
      new User(
        undefined,
        email,
        firstName,
        lastName,
        password,
        gender,
        dateOfBirth,
        registrationAt,
        timeOfLastModification
      )
    );
    navigate("/api/login")
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm" style={{ marginTop: "2%", marginBottom: "7%" }}>
        <Box
          component="form"
          onSubmit={handleSubmit(registerUser)}
          sx={{
            "& .MuiTextField-root": { m: 1 },
            maxWidth: "md",
            padding: "26px",
            textAlign: "center",
            borderRadius: "30px",
            boxShadow: "0 0 2em hsl(231deg 68% 100%)",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            alignItems: "center",
            backgroundColor: "#F3F1F3",
          }}
          noValidate
          autoComplete="off"
        >
          <Typography
            fontFamily="Abyssinica SIL, serif"
            letterSpacing="2px"
            fontSize="28px"
          >
            Register
          </Typography>

          <Avatar>
            <HowToRegIcon style={{ color: "rgb(71, 11, 81)" }} />
          </Avatar>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              flexDirection: "column",
            }}
          >
            <TextInputField
              name="email"
              control={control}
              label="Email*"
              error={errors.email?.message}
            />
            <TextInputField
              name="firstName"
              control={control}
              label="First Name*"
              error={errors.firstName?.message}
            />
            <TextInputField
              name="lastName"
              control={control}
              label="Last Name*"
              error={errors.lastName?.message}
            />
            <TextInputField
              name="dateOfBirth"
              control={control}
              label="Date of Birth*"
              error={errors.dateOfBirth?.message}
            />
            <TextInputField
              name="password"
              control={control}
              label="Password*"
              type="password"
              error={errors.password?.message}
            />
            <TextInputField
              name="confirmPassword"
              control={control}
              label="Confirm Password*"
              type="password"
              error={errors.confirmPassword?.message}
            />

            <FormControl style={{ marginTop: "7px" }}>
              <FormLabel
                id="demo-radio-buttons-group-label"
                style={{
                  fontFamily: "Abyssinica SIL,serif",
                  fontWeight: "400",
                  fontSize: "18px",
                  color: "#202020",
                }}
              >
                Gender:
              </FormLabel>

              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  flexWrap: "wrap",
                }}
              >
                <RadioButton
                  label="Female"
                  // checked={gender === Gender.Female}
                  control={<Radio sx={radioBtnStyle} />}
                  value="female"
                  // onChange={() => {
                  //   setGender(Gender.Female);
                  // }}
                />
                <RadioButton
                  label="Male"
                  // onChange={() => setGender(Gender.Male)}
                  // checked={gender === Gender.Male}
                  control={<Radio sx={radioBtnStyle} />}
                  value="male"
                />
                <RadioButton
                  label="Other"
                  // onChange={() => setGender(Gender.Other)}
                  // checked={gender === Gender.Other}
                  control={<Radio sx={radioBtnStyle} />}
                  value="other"
                />
              </RadioGroup>
            </FormControl>

            <Button
              variant="contained"
              type="submit"
              disabled={!(isDirty && isValid)}
              size="small"
              style={{
                alignSelf: "center",
                marginTop: "5px",
                backgroundColor: "rgb(71, 11, 81)",
                color: "white",
              }}
            >
              Register
            </Button>

            <Link
              to="/api/login"
              style={{
                marginTop: "5px",
                fontSize: "14px",
                backgroundColor: "#F3F1F3",
                textDecorationColor: "rgb(79, 55, 83)",
                cursor: "pointer",
                color: "rgb(79, 55, 83)",
              }}
            >
              Already have an account? Sign in
            </Link>
          </div>
        </Box>
      </Container>
    </>
  );
}
